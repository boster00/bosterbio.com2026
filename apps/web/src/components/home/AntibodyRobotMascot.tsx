/**
 * Brand mascot — vector asset from `public/images/mascot-robot.svg` (Boster-style antibody robot).
 */
export function AntibodyRobotMascot({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/mascot-robot.svg"
      alt=""
      className={className}
      width={280}
      height={300}
      decoding="async"
    />
  )
}
