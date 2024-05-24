import useAcceptSignup from '@/apis/mutations/useAcceptSignup';
import useAdminSuspenseQuery from '@/apis/queries/useAdminSuspenseQuery';
import { getLastUpdateTime } from '@/utils/getLastUpdateTime';

export default function Admin() {
  const { data: pendingUserList } = useAdminSuspenseQuery();
  const { mutate: acceptSignup } = useAcceptSignup();

  return (
    <div className="flex h-full w-full items-center justify-center pt-10">
      <table className="border-collapse border text-center ">
        <tr>
          <th className="border-collapse border p-2">계정명</th>
          <th className="border-collapse border p-2">생성일자</th>
          <th className="border-collapse border p-2">이미지 정보</th>
          <th className="border-collapse border p-2">승인</th>
        </tr>
        {pendingUserList.map((pendingUser) => {
          const { username, createdAt, studentIdImagePath } = pendingUser;

          return (
            <tr key={username}>
              <td className="border-collapse border p-2">{username}</td>
              <td className="border-collapse border p-2">{getLastUpdateTime(createdAt)}</td>
              <td className="border-collapse border p-2">
                <a
                  className="text-sanbo-blue"
                  href={`${import.meta.env.VITE_API_DOMAIN}/image/${studentIdImagePath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  이미지 보기
                </a>
              </td>
              <td className="border-collapse border p-2">
                <button className="text-sanbo-blue" type="button" onClick={() => acceptSignup(username)}>
                  승인
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
