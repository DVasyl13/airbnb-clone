import React, { useCallback } from 'react';
// @ts-ignore
import { CloudinaryContext, Image } from 'cloudinary-react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    const cloudName = 'dsxgddc7p';

    const beginUpload = () => {
        const uploadOptions = {
            cloudName,
            uploadPreset: 'bpkzzgyp',
            maxFiles: 1,
            sources: ['local', 'url', 'camera'],
            multiple: false,
            cropping: true,
            showSkipCropButton: false,
            croppingAspectRatio: 16/9,
        };
        // @ts-ignore
        window.cloudinary.openUploadWidget(uploadOptions, (error, result) => {
            if (!error && result && result.event === 'success') {
                handleUpload(result);
            }
        });
    };

    return (
        <CloudinaryContext cloudName={cloudName}>
            <div
                onClick={() => beginUpload()}
                className="
                    relative
                    cursor-pointer
                    hover:opacity-70
                    transition
                    border-dashed
                    border-2
                    p-20
                    border-neutral-300
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-4
                    text-neutral-600"
            >
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
                {value && (
                    <div className="absolute inset-0 w-full h-full">
                        <Image publicId={value} width="300" height="300" crop="fill" style={{ objectFit: 'cover' }} />
                    </div>
                )}
            </div>
        </CloudinaryContext>
    );
};

export default ImageUpload;