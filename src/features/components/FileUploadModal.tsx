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
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useFormContext } from "react-hook-form";

const FileUploadModal = () => {
    const { setValue } = useFormContext(); // Pour accéder au formulaire global
    const [files, setFiles] = useState<ExtFile[]>([]);

    useEffect(() => {
        if(files[0] && files[0].file instanceof File) {
            setValue("file", files[0].file); // Mettre à jour le champs file dans le formulaire global
        }
    },[files]);
    const updateFiles = (incommingFiles:ExtFile[]) => {
        //do something with the files
        setFiles(incommingFiles);
    };
    const removeFile = (id: string | number | undefined) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id));
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
                    <Dropzone
                        onChange={updateFiles}
                        value={files}
                        accept="image/*"
                        className="w-full"
                        maxFiles={1}
                        color="#ad056a"
                        behaviour="replace"
                        >
                        {files.map((file: ExtFile) => (
                            <FileMosaic key={file.id} {...file} onDelete={removeFile} info={true} preview/>
                            ))}
                    </Dropzone>
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
