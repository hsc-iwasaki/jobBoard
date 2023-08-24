import { useRouter } from "next/router";
export default function Signup() {
  return (
    <form action="/api/auth/signup" method="POST">
      <input name="username" required placeholder="Username" />
      <input name="email" required placeholder="Email" />
      <input name="password" required type="password" placeholder="Password" />
      <button type="submit">Sign up</button>
    </form>
  );
}
