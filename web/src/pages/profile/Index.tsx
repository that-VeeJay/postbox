import ProfileTabs from "./ProfileTabs";
import ProfileInfo from "./ProfileInfo";

const MAX_BIO_LENGTH = 150;
const DEFAULT_TAB = "uploads";

export default function Profile() {
  return (
    <div className="mx-auto w-full max-w-6xl p-5 pt-5">
      <div className="space-y-8 md:space-y-15">
        {/* Top Section */}
        <ProfileInfo bioLength={MAX_BIO_LENGTH} />
        {/* Bottom Section */}
        <ProfileTabs defaultTab={DEFAULT_TAB} />
      </div>
    </div>
  );
}
