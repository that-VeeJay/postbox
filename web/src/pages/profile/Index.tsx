import ProfileTabs from "./ProfileTabs";
import ProfileInfo from "./ProfileInfo";

export default function Profile() {

  return (
    <div className="mx-auto w-full max-w-6xl p-5 pt-5">
      <div className="space-y-8 md:space-y-15">
        {/* Top Section */}
        <ProfileInfo />
        {/* Bottom Section */}
        <ProfileTabs />
      </div>
    </div>
  );
}
