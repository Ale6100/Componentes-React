/**
 * Props para el componente ProgressCircle.
 *
 * @typedef {Object} ProgressCircleProps
 * @property {number} percentage - El porcentaje de progreso (0 a 100).
 * @property {string} [className] - Clases adicionales para el contenedor del componente.
 * @property {string} [classNameNumber] - Clases adicionales para el texto del porcentaje.
 */
interface ProgressCircleProps {
  percentage: number;
  className?: string;
  classNameNumber?: string;
}

/**
 * Componente que renderiza un círculo de progreso con un porcentaje visual y color dinámico.
 *
 * @param {ProgressCircleProps} props - Las props del componente.
 * @returns {JSX.Element} Un círculo de progreso renderizado.
 */
const ProgressCircle = ({ percentage, className, classNameNumber }: ProgressCircleProps): JSX.Element => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (circumference * clampedPercentage) / 100;

  const getColor = (percent: number) => {
    const r = Math.round(255 * (1 - percent / 100));
    const g = 255;
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <div className={`relative ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
        <circle className="transition-all duration-300 ease-in-out" strokeWidth="10" strokeLinecap="round" stroke={getColor(clampedPercentage)} fill="transparent" r={radius} cx="50" cy="50" style={{ strokeDasharray, strokeDashoffset, transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-semibold ${classNameNumber}`}>{clampedPercentage}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
