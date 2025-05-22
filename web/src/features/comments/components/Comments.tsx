
import Compose from "./Compose";
import List from "./List";

export default function Comments() {


  return (
    <>
      <div className="space-y-5">
        <div className="text-xl font-semibold">10 Comments</div>
        <Compose />
      </div>
      {/* Comments List */}
      <div className="space-y-6">
        <List />
        <List />
      </div>
    </>
  );
}
