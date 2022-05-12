import del from 'del';

export function clean(resolve, reject) {
  del(['docs/*'], { dot: true });
  resolve();
};
