import { toast } from "@/components/ui/use-toast";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
import React, { useState } from "react";
import Image from "next/image";
import { LuUploadCloud } from "react-icons/lu";
import { ErrorMessage } from "@hookform/error-message";
interface PostImageProps {
  register: any;
  watch: any;
  errors?: any;
  className?: string;
  setValue: any;
}
const PostImage = ({
  register,
  watch,
  errors,
  className,
  setValue,
}: PostImageProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("image");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    watch
  );
  const readFileAsDataURL = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileData = await readFileAsDataURL(file);

    try {
      const uploadResult = await uploadImage(fileData, {
        action: "postCreation",
      });
      setUploadedImageUrl(uploadResult);
      if (uploadResult) {
        setValue("image", uploadResult);
      }
      toast({
        type: "foreground",
        variant: "default",
        title: "Image Uploaded Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        type: "foreground",
        variant: "destructive",
        title: "Error Uploading Image",
      });
    }
  };

  return (
    <div className="gap-7.5 relative flex h-[361px] w-full flex-col content-center items-center justify-center space-y-2 bg-black-800 ">
      <div style={{ backgroundImage: ` "url('/images/placeholder.png')"` }}>
        {uploadedImageUrl && (
          <Image
            src={uploadedImageUrl}
            alt="uploaded image"
            className=" object-cover"
            height={200}
            width={200}
            sizes="200px"
          />
        )}
      </div>
      <input
        type="hidden"
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={inputRef}
      />
      <button
        type="button"
        onClick={() => inputRef.current !== null && inputRef.current.click()}
        className="paragraph-3-medium r flex h-[40px] w-[250px] flex-row items-center justify-between gap-2 rounded-[5px] bg-black-700 px-3.5 py-2 align-middle text-white-300  shadow shadow-gray-800/10 "
      >
        {" "}
        <LuUploadCloud size={32} />
        <span className="text-nowrap">Upload Component Preview</span>
      </button>
      {errors && (
        <ErrorMessage
          errors={errors}
          as="p"
          render={({ message }) => <p className="text-red-500">{message}</p>}
          name={"image"}
        />
      )}
    </div>
  );
};

export default PostImage;
