import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SelectUsers({ data, setData }) {
    return (
        <div>
            {data.team.map((userName, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "7px",
                            marginTop: "7px",
                            marginBottom: "7px",
                        }}
                    >
                        <Form.Control
                            type="text"
                            name="userName"
                            value={userName}
                            onChange={(e) => {
                                const newUserName = e.target.value;
                                setData({
                                    ...data,
                                    team: data.team.map((userName, i) => {
                                        if (i === index) {
                                            return newUserName;
                                        }
                                        return userName;
                                    }),
                                });
                            }}
                        />
                        {index > 0 && (
                            <Button
                                variant="success"
                                onClick={() => {
                                    setData({
                                        ...data,
                                        team: data.team.filter(
                                            (_, i) => i !== index
                                        ),
                                    });
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            variant="success"
                            onClick={() => {
                                setData({
                                    ...data,
                                    team: [...data.team, ""],
                                });
                            }}
                        >
                            Add
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}
