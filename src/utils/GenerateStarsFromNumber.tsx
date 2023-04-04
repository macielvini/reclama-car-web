import * as TablerIcons from "@tabler/icons-react";

export function GenerateStarsFromNumber(rating: number): JSX.Element | void {
  if (rating > 10) {
    console.log("GENERATE STARS FROM NUMBER ERROR: Max rating is 10");
    return;
  }
  const filled = Math.floor(rating);
  const half = rating - filled >= 0.5 ? 1 : 0;
  const empty = Math.floor(5 - filled - half);

  const stars: JSX.Element[] = [];

  Array.from({ length: filled }).forEach((_, index) =>
    stars.push(<TablerIcons.IconStarFilled size={14} key={"ABCDE"[index]} />)
  );
  Array.from({ length: half }).forEach((_, index) =>
    stars.push(
      <TablerIcons.IconStarHalfFilled size={14} key={"FGHIJ"[index]} />
    )
  );
  Array.from({ length: empty }).forEach((_, index) =>
    stars.push(<TablerIcons.IconStar size={14} key={"KLMNO"[index]} />)
  );

  return <>{stars}</>;
}
