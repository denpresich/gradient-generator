const generateGradient = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
  const randomDeg = Math.floor(Math.random() * 360);
  const gradient = `linear-gradient(${randomDeg}deg, #${randomColor}, #${randomColor2})`;

  document.getElementById("gradient-preview").style.background = gradient;
};

const copyGradient = () => {
  const gradient = document.getElementById("gradient-preview").style.background;

  navigator.clipboard.writeText(gradient);
};

generateGradient();
