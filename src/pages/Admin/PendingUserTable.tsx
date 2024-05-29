import { PendingUserDataResponse } from '@/types/apis/auth';
import { getLastUpdateTime } from '@/utils/getLastUpdateTime';

interface PendingUserTableProps {
  pendingUserList: PendingUserDataResponse[];
  acceptSignup: (id: number) => void;
}

export default function PendingUserTable({ pendingUserList, acceptSignup }: PendingUserTableProps) {
  return (
    <table className="border-collapse border text-center ">
      <thead>
        <tr>
          <th className="border-collapse border p-2">계정명</th>
          <th className="border-collapse border p-2">생성일자</th>
          <th className="border-collapse border p-2">이미지 정보</th>
          <th className="border-collapse border p-2">승인</th>
        </tr>
      </thead>
      {pendingUserList.map((pendingUser) => {
        const { id, username, createdAt, studentIdImagePath } = pendingUser;

        return (
          <tbody key={id}>
            <tr>
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
                <button className="text-sanbo-blue" type="button" onClick={() => acceptSignup(id)}>
                  승인
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}
