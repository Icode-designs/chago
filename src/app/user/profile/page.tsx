"use client";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { UserContent } from "@/styles/components/User.styles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <UserContent>
      <form>
        <div>
          <h1>Update Profile</h1>
        </div>

        <fieldset>
          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                minLength={3}
                defaultValue={user?.firstName}
              />
            </div>
            <div>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                minLength={3}
                defaultValue={user?.lastName}
              />
            </div>
          </FlexBox>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={user?.email as string}
              name="email"
              id="email"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter Phone Number"
              defaultValue={user?.phoneNumber ? user.phoneNumber : undefined}
            />
          </div>
          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="password">New Password</label>
              <input
                className="password"
                minLength={8}
                type={!showPassword ? "password" : "text"}
                placeholder="Enter New Password"
                name="password"
                id="password"
              />
              <button
                className="eye"
                type="button"
                onClick={toggleShowPassword}
              >
                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                name="confirm-password"
                minLength={8}
              />
            </div>
          </FlexBox>

          <div>
            <label htmlFor="street-address">Street</label>
            <input
              type="text"
              name="street-address"
              id="street-address"
              placeholder="Enter Street Address"
              defaultValue={
                user?.address?.street ? user.address.street : undefined
              }
            />
          </div>
          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City"
                defaultValue={
                  user?.address?.city ? user.address.city : undefined
                }
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Enter State"
                defaultValue={
                  user?.address?.state ? user.address.state : undefined
                }
              />
            </div>
          </FlexBox>
        </fieldset>

        <CustomButton $variant="extended" type="submit">
          Update
        </CustomButton>
      </form>
    </UserContent>
  );
};

export default Page;
