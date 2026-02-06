const supabaseUrl = "PASTE_YOUR_PROJECT_URL";
const supabaseKey = "PASTE_YOUR_ANON_KEY";

const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// SIGNUP
async function signup() {
  const email = document.getElementById("semail").value;
  const password = document.getElementById("spassword").value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) alert(error.message);
  else alert("Signup success — Login pannunga");
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) alert(error.message);
  else window.location = "dashboard.html";
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  window.location = "index.html";
}
