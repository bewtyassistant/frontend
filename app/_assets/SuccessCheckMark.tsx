export default function SuccessCheckMark() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle border */}
      <circle
        cx="100"
        cy="100"
        r="98"
        stroke="#08CE34"
        strokeWidth="4"
        fill="none" 
      />

      {/* Inner green circle */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="#08CE34"
      />

      
      <path
        d="M130 75 L95 125 L70 100"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
