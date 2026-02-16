const planets = [
  {
    name: 'Mercury',
    color: '#b1b1b1',
    radius: 6,
    orbit: 60,
    speed: 0.04,
    info: 'Mercury is the closest planet to the Sun. It has no moons.'
  },
  {
    name: 'Venus',
    color: '#e6c07b',
    radius: 9,
    orbit: 90,
    speed: 0.03,
    info: 'Venus is the hottest planet. It has a thick, toxic atmosphere.'
  },
  {
    name: 'Earth',
    color: '#4a90e2',
    radius: 10,
    orbit: 120,
    speed: 0.025,
    info: 'Earth is our home planet. It has one moon and supports life.'
  },
  {
    name: 'Mars',
    color: '#d14b2a',
    radius: 8,
    orbit: 150,
    speed: 0.02,
    info: 'Mars is known as the Red Planet. It has two moons.'
  },
  {
    name: 'Jupiter',
    color: '#e3c16f',
    radius: 18,
    orbit: 200,
    speed: 0.015,
    info: 'Jupiter is the largest planet. It has dozens of moons.'
  },
  {
    name: 'Saturn',
    color: '#f7e7b4',
    radius: 16,
    orbit: 250,
    speed: 0.012,
    info: 'Saturn is famous for its rings. It has many moons.'
  },
  {
    name: 'Uranus',
    color: '#7ad7e6',
    radius: 13,
    orbit: 290,
    speed: 0.01,
    info: 'Uranus rotates on its side. It has faint rings.'
  },
  {
    name: 'Neptune',
    color: '#4666e6',
    radius: 13,
    orbit: 330,
    speed: 0.009,
    info: 'Neptune is the farthest planet. It is very cold and windy.'
  }
];

const canvas = document.getElementById('solar-canvas');
const ctx = canvas.getContext('2d');
const infoBox = document.getElementById('planet-info');
canvas.width = 700;
canvas.height = 700;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let time = 0;
let animationId;

function drawSolarSystem() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw Sun
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffd700';
  ctx.shadowColor = '#ffd700';
  ctx.shadowBlur = 40;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Draw orbits
  planets.forEach(planet => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, planet.orbit, 0, 2 * Math.PI);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // Draw planets
  planets.forEach(planet => {
    const angle = time * planet.speed;
    const x = centerX + planet.orbit * Math.cos(angle);
    const y = centerY + planet.orbit * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, planet.radius, 0, 2 * Math.PI);
    ctx.fillStyle = planet.color;
    ctx.fill();
    // Store planet position for hover detection
    planet._x = x;
    planet._y = y;
  });
}

function animate() {
  time += 0.02;
  drawSolarSystem();
  animationId = requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  let found = false;
  planets.forEach(planet => {
    const dx = mouseX - planet._x;
    const dy = mouseY - planet._y;
    if (Math.sqrt(dx * dx + dy * dy) < planet.radius + 4) {
      infoBox.style.display = 'block';
      infoBox.style.left = (planet._x + 40) + 'px';
      infoBox.style.top = (planet._y + 40) + 'px';
      infoBox.innerHTML = `<h3>${planet.name}</h3><p>${planet.info}</p>`;
      found = true;
    }
  });
  if (!found) {
    infoBox.style.display = 'none';
  }
});

canvas.addEventListener('mouseleave', () => {
  infoBox.style.display = 'none';
});

// Controls
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
pauseBtn.addEventListener('click', () => {
  cancelAnimationFrame(animationId);
});
resumeBtn.addEventListener('click', () => {
  animate();
});

animate();
