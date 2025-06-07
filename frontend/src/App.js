import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react';
import Dashboard from './Dashboard';

function App() {
  return (
    <>
      <SignedIn>
        <UserButton />
        <Dashboard />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;
