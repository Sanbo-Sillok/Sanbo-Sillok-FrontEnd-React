import useSignupFormStore from '@/stores/signupFormStore';

export default function usePolicyAgreement() {
  const policyAgreement = useSignupFormStore((state) => state.policyAgreement);
  const setPolicyAgreement = useSignupFormStore((state) => state.setPolicyAgreement);

  return { policyAgreement, setPolicyAgreement };
}
