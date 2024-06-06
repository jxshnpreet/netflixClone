"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/movieForm";
import { cn } from "@/app/utils/cn";
import { useForm, SubmitHandler } from "react-hook-form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase"; // import the storage from your firebaseConfig
import prisma from "../utils/db";
import postData from "./postData";

export default function MovieRegistration() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: monitor upload progress
      },
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(downloadUrl);
        setUploading(false);
      }
    );
  };

  const onSubmit: SubmitHandler<any> = (data, e) => {
    e?.preventDefault();
    console.log("data", data);

    const file = data.imageString[0];
    data.age = Number(data.age)

    if(file){

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        setUploading(true);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Optional: monitor upload progress
          },
          (error) => {
            console.error("Upload failed", error);
            setUploading(false);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            // setImageUrl(downloadUrl);
            setUploading(false);

            data.imageString = downloadUrl
            data.category = 'Recently Added';

            postData(data);

          }
        )
    }

    // handleImageUpload(data.imageString[0])
  };

  return (
    <div className="mt-[4.8rem]">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Add Movies to Netflix Here
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Fill the details below to add you exclusive movies/shows to Netflix Clone :)
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="title">Movie Name</Label>
              <Input id="title" placeholder="Movie" type="text" {...register('title', { required: { value: true, message: "Please Add title" } })} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="imageString">Thumbnail</Label>
              <Input
                id="imageString"
                placeholder="Url"
                type="file"
                {...register('imageString', { required: "Please add image" })}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="......." type="text" {...register('description', { required: "Please add description" })} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="videoUrl">Video</Label>
            <Input id="videoUrl" placeholder="clip not required" type="text" {...register('videoUrl')} />
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="age">Age</Label>
              <Input id="age" placeholder="18+" type="number" {...register('age', { required: "Please add age" })} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="release">Release</Label>
              <Input id="release" placeholder="Year" type="text" {...register('release', { required: "Please add release Year" })} />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="duration in hrs" type="text" {...register('duration', { required: "Please add duration" })} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="youtubeString">Youtube Url</Label>
              <Input id="youtubeString" placeholder="Url" type="text" {...register('youtubeString', { required: "Please add youtube string" })} />
            </LabelInputContainer>
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
