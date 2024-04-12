import ShowPolicyButton from './ShowPolicyButton';
import usePolicyAgreement from '@/hooks/SignupForm/usePolicyAgreement';

export default function PolicyAreementInput() {
  const { policyAgreement, setPolicyAgreement } = usePolicyAgreement();

  return (
    <div className="flex items-center justify-between gap-5 px-2 py-4">
      <label htmlFor="agreement" className="flex select-none gap-3 align-middle text-base-800 dark:text-base-300">
        <input
          id="agreement"
          name="agreement"
          className="scale-150"
          type="checkbox"
          checked={policyAgreement}
          onChange={(event) => setPolicyAgreement(event.target.checked)}
        />
        (필수) 산보실록 이용약관 동의
      </label>
      <ShowPolicyButton />
    </div>
  );
}
