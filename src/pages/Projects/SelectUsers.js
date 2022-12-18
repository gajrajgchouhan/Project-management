export default function SelectUsers({ data, setData }) {
    return (
        <div>
            {data.users.map((userName, index) => {
                return (
                    <div key={index}>
                        <input
                            type="text"
                            name="userName"
                            value={userName}
                            onChange={(e) => {
                                const newUserName = e.target.value;
                                setData({
                                    ...data,
                                    users: data.users.map((userName, i) => {
                                        if (i === index) {
                                            return newUserName;
                                        }
                                        return userName;
                                    }),
                                });
                            }}
                        />
                        {index > 0 && (
                            <button
                                onClick={() => {
                                    setData({
                                        ...data,
                                        users: data.users.filter(
                                            (_, i) => i !== index
                                        ),
                                    });
                                }}
                            >
                                Delete
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setData({
                                    ...data,
                                    users: [...data.users, ""],
                                });
                            }}
                        >
                            Add
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
