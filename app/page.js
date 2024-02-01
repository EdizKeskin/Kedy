import Main from "@/components/Main";
import SidebarItems from "@/components/SidebarItems";
import Title from "@/components/Title";
import { getData } from "@/utils";

export default async function Home() {
  const data = await getData();

  return (
    <main className="min-h-screen ">
      <div className="absolute -translate-x-1/2 left-1/2 top-6 lg:hidden">
        <Title />
      </div>
      <div className="h-full drawer lg:drawer-open">
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
