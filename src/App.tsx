import { useState } from 'react';

export default function App() {
  // 12번의 체크 상태를 관리
  const [checks, setChecks] = useState(Array(12).fill(false));

  // 버튼 클릭 시 체크 상태 토글
  const toggleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  // 진행률 계산
  const completedCount = checks.filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / 12) * 100);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 mt-10">
        
        {/* 헤더 섹션 */}
        <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-2">
          📖 3월 2째주 말씀 읽기
        </h1>
        <p className="text-center text-gray-500 mb-8 font-medium">
          요한복음 1장 (목표: 12회)
        </p>

        {/* 진행률 바 (100% 다 채워지는 방식) */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
            <span>진행률</span>
            <span className={progressPercentage === 100 ? "text-green-600" : "text-blue-600"}>
              {progressPercentage}% ({completedCount}/12)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
            <div
              // 100%가 되면 파란색에서 초록색으로 바뀝니다!
              className={`h-5 rounded-full transition-all duration-500 ease-out ${
                progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 세로로 나열된 리스트 (1회, 2회, 3회...) */}
        <div className="flex flex-col gap-3">
          {checks.map((isChecked, index) => (
            <button
              key={index}
              onClick={() => toggleCheck(index)}
              className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                isChecked
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg font-bold">{index + 1}회</span>
              
              {/* 우측 동그라미 체크 아이콘 */}
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors ${
                isChecked ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 bg-white'
              }`}>
                {isChecked && '✓'}
              </div>
            </button>
          ))}
        </div>
        
        {/* 100% 달성 시 나타나는 축하 메시지 */}
        {progressPercentage === 100 && (
          <div className="mt-8 p-4 bg-green-100 text-green-800 text-center rounded-xl font-bold animate-bounce shadow-sm">
            🎉 100% 달성! 3월 2째주 목표를 모두 채우셨습니다!
          </div>
        )}
        
      </div>
    </div>
  );
}