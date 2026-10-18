import UtilityBar from "./UtilityBar";
import MainBar from "./MainBar";

type HeaderProps = {
  activeHref: string;
};

/**
 * Site header: the utility bar scrolls away while the main bar stays sticky.
 * Rendered as siblings so `position: sticky` resolves against the page.
 */
export default function Header({ activeHref }: HeaderProps) {
  return (
    <>
      <UtilityBar />
      <MainBar activeHref={activeHref} />
    </>
  );
}
