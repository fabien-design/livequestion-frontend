import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useFormContext } from "react-hook-form";

const FileUploadModal = () => {
    const { setValue } = useFormContext(); // Pour accéder au formulaire global
    const fileTypes = ["JPG", "PNG", "GIF"];

    const [file, setFile] = useState<File | null>(null); // Stocker l'objet File, pas l'URL Blob

    const handleChange = (uploadedFile: File) => {
        setFile(uploadedFile); // Stocker directement le fichier dans l'état local
        setValue("file", uploadedFile); // Mettre à jour la valeur du fichier dans le formulaire global avec l'objet File
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-gray-200 hover:bg-gray-300">
                    Add a picture
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload your picture</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        />
                        {file && (
                            <div style={{ marginTop: "20px" }}>
                                <h4>Image Preview:</h4>
                                <img
                                    src={URL.createObjectURL(file)} // Créer une URL Blob pour l'aperçu seulement
                                    alt="Uploaded Preview"
                                    style={{ maxWidth: "100%", height: "auto" }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2">
                            Confirm
                        </span>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadModal;
