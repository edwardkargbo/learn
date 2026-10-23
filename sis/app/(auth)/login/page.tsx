import { Button } from "@/Components/ui/button";

export default function Page() {
  return (
    <div className="block justify-center items-center bg-amber-200 h-full w-full">
      <form
        action=""
        method="get"
        className="h-full w-full  justify-center items-center block"
      >
        <div className="justify-center items-center mx-auto w-full">
          <div className="">
            <label htmlFor="email">Email: </label>
            <input type="email" name="emmail" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
          </div>
          <Button>Login</Button>
        </div>
      </form>
    </div>
  );
}
