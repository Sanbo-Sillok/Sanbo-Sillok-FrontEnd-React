import SignupForm from '@/components/Signup/SignupForm';

export default function SignUp() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-10">
      <img src="/favicon.ico" alt="산보실록 아이콘" width={100} height={100} />
      <SignupForm />
    </div>
  );
}
