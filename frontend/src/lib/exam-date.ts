/**
 * 今日の 0:00 と試験日の 0:00 の差（日数）を返す。
 * @param examDate - 試験日（YYYY-MM-DD）または null
 * @returns 残り日数。過去または未設定の場合は null
 */
export function getDaysRemaining(examDate: string | null): number | null {
  if (!examDate || typeof examDate !== 'string') return null;
  const exam = new Date(examDate);
  if (isNaN(exam.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);
  const diffMs = exam.getTime() - today.getTime();
  const days = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  return days < 0 ? null : days;
}
