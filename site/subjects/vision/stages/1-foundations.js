export default {
  id: 'foundations',
  level: 'Basics',
  title: 'The math toolkit',
  summary: 'Vectors, matrices, gradients and probability — only what modern vision actually uses, with the intuition first.',
  lessons: [
    { id: 'vectors-dot-product', title: 'Vectors, dot products & similarity', summary: 'Why “how similar are these two images?” becomes an angle between arrows.', minutes: 25, ready: true },
    { id: 'matrices-linear-maps', title: 'Matrices as transformations', summary: 'A neural network layer is a matrix. Shapes, multiplication, and what it does to space.', minutes: 25, ready: true },
    { id: 'derivatives-gradients', title: 'Derivatives, gradients & the chain rule', summary: 'How a model knows which way to change its millions of numbers.', minutes: 30, ready: true },
    { id: 'probability-softmax', title: 'Probability, softmax & cross-entropy', summary: 'Turning scores into beliefs, measuring surprise, and the temperature knob DINO relies on.', minutes: 30, ready: true },
  ],
};
