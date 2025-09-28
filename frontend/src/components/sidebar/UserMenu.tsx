type UserMenuProps = {
  username: string;
};

export default function UserMenu({ username }: UserMenuProps) {
  return (
    <div className="flex flex-col">
      <button className="px-4 py-2 text-left rounded-lg cursor-pointer hover:bg-gray-100 font-semibold transition-colors duration-200 ease-in-out">
        Sair de {username}
      </button>
    </div>
  );
}
