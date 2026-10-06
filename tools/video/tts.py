#!/usr/bin/env python3
"""Narration helper for tools/video/build.mjs (German voice: Piper "Thorsten", CC0).
  tts.py synth    jobs.json            jobs = [{ "file": "x.wav", "text": "…" }]  (skips existing files)
  tts.py assemble plan.json out.wav    plan = { "total": seconds, "items": [{ "file": "x.wav", "start": seconds }] }
"""
import json, os, sys, wave
import numpy as np

VOICE = os.environ.get('VIDEO_VOICE', os.path.expanduser('~/.cache/learning-video/voices/de_DE-thorsten-high.onnx'))
RATE = 22050

def synth_edge(jobs):
    """Cloud voices (Microsoft Edge neural TTS via the edge-tts package). Learning text only (see project notes)."""
    import asyncio, subprocess, edge_tts
    sem = asyncio.Semaphore(3)
    async def one(j):
        voice = j['voice'].split(':', 1)[1]
        mp3 = j['file'][:-4] + '.mp3'
        async with sem:
            for attempt in range(5):
                try:
                    await edge_tts.Communicate(j['text'], voice, rate=os.environ.get('VIDEO_RATE', '+6%')).save(mp3)
                    break
                except Exception as e:
                    if attempt == 4: raise
                    await asyncio.sleep(2 + attempt * 2)
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', mp3, '-ar', str(RATE), '-ac', '1', '-c:a', 'pcm_s16le', j['file']], check=True)
        os.remove(mp3)
        print('synth', os.path.basename(j['file']), voice, flush=True)
    async def run(): await asyncio.gather(*[one(j) for j in jobs])
    asyncio.run(run())

def synth(jobs):
    edge = [j for j in jobs if j.get('voice', '').startswith('edge:') and not (os.path.exists(j['file']) and os.path.getsize(j['file']) > 1000)]
    for j in edge: os.makedirs(os.path.dirname(j['file']), exist_ok=True)
    if edge: synth_edge(edge)
    jobs = [j for j in jobs if not j.get('voice', '').startswith('edge:')]
    if not jobs: return
    from piper import PiperVoice
    try:
        from piper import SynthesisConfig
        cfg = SynthesisConfig(length_scale=1.06, noise_scale=0.6)   # a little slower and steadier than default: easier to follow
    except Exception:
        cfg = None
    voice = PiperVoice.load(VOICE)
    for j in jobs:
        if os.path.exists(j['file']) and os.path.getsize(j['file']) > 1000:
            continue
        os.makedirs(os.path.dirname(j['file']), exist_ok=True)
        with wave.open(j['file'], 'wb') as w:
            if cfg is not None:
                voice.synthesize_wav(j['text'], w, syn_config=cfg)
            else:
                voice.synthesize_wav(j['text'], w)
        print('synth', os.path.basename(j['file']), flush=True)

def read(path):
    with wave.open(path, 'rb') as w:
        assert w.getnchannels() == 1 and w.getsampwidth() == 2
        return w.getframerate(), np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)

def assemble(plan, out):
    total = int((plan['total'] + 0.5) * RATE)
    track = np.zeros(total, dtype=np.float32)
    for it in plan['items']:
        sr, data = read(it['file'])
        assert sr == RATE, f'unexpected sample rate {sr}'
        a = int(it['start'] * RATE); b = min(total, a + len(data))
        track[a:b] += data[:b - a].astype(np.float32)
    peak = float(np.max(np.abs(track))) or 1.0
    track = track * min(1.0, 29000 / peak)
    with wave.open(out, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE)
        w.writeframes(track.astype(np.int16).tobytes())

if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'synth': synth(json.load(open(sys.argv[2])))
    elif mode == 'assemble': assemble(json.load(open(sys.argv[2])), sys.argv[3])
    else: sys.exit('usage: tts.py synth|assemble …')
