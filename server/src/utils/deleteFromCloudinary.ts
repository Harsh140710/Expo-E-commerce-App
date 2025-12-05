// Helper function to extract public ID from Cloudinary URL
export function getPublicIdFromUrl(url: string): string {
    const parts = url.split("/");
    const folderAndFile = parts.slice(parts.indexOf("upload") + 1).join("/");
    return folderAndFile.replace(/\.[^/.]+$/, ""); // remove file extension
}