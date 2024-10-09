function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const DailyFooter = ({ day }: { day: string }) => (
  <div>
    <a href="/wwo-24">Others by me</a> |{" "}
    <a href={"https://octothorp.es/~/" + capitalizeFirstLetter(day)}>
      All entries for /{day}
    </a>
  </div>
);
