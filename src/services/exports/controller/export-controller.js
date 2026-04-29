import response from "../../../utils/response.js";
import exportRepositories from "../producers/export-service.js";

const exportBooks = async (req, res, next) => {
    const { targetEmail } = req.validated;

    const message = {
        id: req.user.id,
        targetEmail,
    }

    await exportRepositories.sendMessage('export:books', JSON.stringify(message));

    return response(res, 201, "Permintaan Export Catatan dalam Antrean");
}

export { exportBooks }