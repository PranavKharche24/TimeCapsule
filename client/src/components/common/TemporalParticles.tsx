export default function TemporalParticles() {
  const particles = [
    { left: '10%', delay: '0s' },
    { left: '30%', delay: '1s' },
    { left: '60%', delay: '2s' },
    { left: '80%', delay: '3s' },
    { left: '15%', delay: '1.5s' },
    { left: '45%', delay: '2.5s' },
    { left: '75%', delay: '3.5s' },
  ];

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="temporal-particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
