import Main from "@/components/Main";
import SidebarItems from "@/components/SidebarItems";
import { getData } from "@/utils";

export default async function Home() {
  const data = await getData();

  return (
    <main className="min-h-screen ">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center drawer-content">
          <Main data={data} />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
            <SidebarItems />
          </ul>
        </div>
      </div>
    </main>
  );
}
