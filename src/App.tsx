import Header from "@/components/Header/Header";
import ExpenseList from "@/components/mainLayout/ExpenseList";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <Header />
      <div className="w-full max-w-screen-sm m-auto">
      <ExpenseList/>

      </div>
      <Toaster />

    </>
  );
}

export default App;
