function Theme({ age }: { age: number }) {
  return (
    <div>
      <div>
        <span>{age}</span> {'형님반이군요! 좋아요!!'}
      </div>
      <div>{'어떤 주제를 생각하고 계신가요?'}</div>
    </div>
  );
}
export default Theme;
