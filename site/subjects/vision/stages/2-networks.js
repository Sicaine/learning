export default {
  id: 'networks',
  level: 'Basics',
  title: 'Learning machines',
  summary: 'From a single neuron to deep networks: how they compute, how they learn, and why they generalize (or don’t).',
  lessons: [
    { id: 'neurons-mlp', title: 'Neurons, layers & activations', summary: 'Stacking linear maps with a bend in between gives you a universal function machine.', minutes: 25, ready: true },
    { id: 'training-loop', title: 'Loss, backprop & optimizers', summary: 'The training loop: forward, loss, backward, step. SGD, momentum, AdamW, learning-rate schedules.', minutes: 35, ready: true },
    { id: 'generalization', title: 'Generalization, overfitting & augmentation', summary: 'Why a model that aces training can fail on your real photos — and the standard defenses.', minutes: 30, ready: true },
  ],
};
