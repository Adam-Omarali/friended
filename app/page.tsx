import {createSupabaseClien}

export default function Home() {
  return(
    <>
    <div style={{display:"flex", justifyContent:"center",}}>
      <button>Logout!</button>
    </div></>
  )
}

function LoginPage(){
  const supabase = useSupabaseClient();
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }
  return (
    <>
      <div>
        <button onClick={loginWithGoogle}>Google Login</button>
      </div>
    </>
  )
}