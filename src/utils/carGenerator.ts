const carBrands = [
  'Tesla',
  'BMW',
  'Mercedes',
  'Ford',
  'Audi',
  'Toyota',
  'Honda',
  'Chevrolet',
  'Nissan',
  'Volkswagen',
];

function getRandomBrand() {
  return carBrands[Math.floor(Math.random() * carBrands.length)];
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

export function generateRandomCar() {
  return {
    name: getRandomBrand(),
    color: getRandomColor(),
  };
}
