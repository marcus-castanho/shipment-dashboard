import { useUser } from "../../../context/UserContext";
import { cn } from "../../../utils/cn";

export const UserSwitch = () => {
  const { users, user, selectUser } = useUser();

  return (
    <div>
      {users.map(({ id, name }, index) => {
        return (
          <button
            onClick={() => selectUser(id)}
            key={id}
            className={cn(
              "bg-gray-400/70 cursor-pointer text-white px-4 py-2",
              user.id === id && "bg-gray-500/70",
              index === 0 && "rounded-l-sm",
              index === 1 && "rounded-r-sm"
            )}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
