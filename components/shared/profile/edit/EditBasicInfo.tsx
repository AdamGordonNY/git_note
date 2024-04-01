import { Input } from "@/components/ui/input";
import React from "react";

interface EditBasicInfoProps {
  register: any;
  errors: any;
  step?: string;
}
const EditBasicInfo = ({ register, errors, step }: EditBasicInfoProps) => {
  return (
    <section className="space-y-2">
      <label
        htmlFor="fullname"
        className="paragraph-3-medium profile-input bg-black-700 text-white-300"
      >
        Name
      </label>
      <Input
        {...register("fullname")}
        className="profile-input bg-black-700 text-white-100 focus:bg-black-700"
        placeholder="fullname"
      />
      {errors.fullname && (
        <p className="text-red-500">{errors.fullname.message}</p>
      )}
      {!step ? (
        <div className="space-y-2">
          <label htmlFor="email" className="paragraph-3-medium text-white-300">
            Username
          </label>

          <Input
            {...register("email")}
            className="profile-input bg-black-700 text-white-100"
            placeholder="email"
            readOnly
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="portfolio" className="text-white-300">
          Portfolio URL
        </label>
        <Input
          {...register("portfolio")}
          className="profile-input bg-black-700 text-white-100"
          placeholder="portfolio"
        />
        {errors.portfolio && (
          <p className="text-red-500">{errors.portfolio.message}</p>
        )}
      </div>
    </section>
  );
};

export default EditBasicInfo;
