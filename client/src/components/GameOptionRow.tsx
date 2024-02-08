interface MyComponentProps {
  icon: string;
  label: string;
  infoText: string;
}

function GameOptionRow(props: MyComponentProps) {
  return (
    <div className="flex items-center justify-between my-3.5 py-4 px-2.5 text-sm tracking-tight border-2">
      <div className="flex items-center">
        <img src={props.icon} alt="Player icon" className="mr-2 h-8 w-8" />
        <span>{props.label}</span>
      </div>
      <div className="flex items-center">
        <span>{props.infoText}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="#4b5563">
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
        </svg>
      </div>
    </div>
  );
}

export default GameOptionRow;
