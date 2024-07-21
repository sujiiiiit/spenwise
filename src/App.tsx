import Header from "@/components/Header/Header";
import ExpenseList from "@/components/mainLayout/ExpenseList";
function App() {
  return (
    <>
      <Header />
      <div className="w-full max-w-screen-sm">
      <ExpenseList/>

      </div>

    </>
  );
}

export default App;
