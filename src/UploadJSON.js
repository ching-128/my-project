import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const UploadJSON = ({ fileUrl }) => {
    const serverScriptUrl = "/replaceJson.php";
    const projectData = useSelector((state) => state.jsonData.project_data);

    const uploadJsonFile = () => {
        fetch(serverScriptUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileUrl: fileUrl,
                newContent: projectData,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <button onClick={uploadJsonFile}>Upload JSON</button>
        </div>
    );
};

UploadJSON.propTypes = {
    fileUrl: PropTypes.string.isRequired,
};

export default UploadJSON;