import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_API_URL;

interface IFormInput {
  newsUrl: String;
}

interface NewsFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  newsUrl: string;
  setNewsUrl: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setSourceHtml: React.Dispatch<React.SetStateAction<string[]>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const urlRegExPattern =
  // eslint-disable-next-line no-useless-escape
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const NewsForm: React.FC<NewsFormProps> = ({
  setIsLoading,
  newsUrl,
  setNewsUrl,
  isLoading,
  setSourceHtml,
  setTitle,
  error,
  setError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    setIsLoading(true);
    const { data } = await axios.post(`${apiBaseUrl}/news`, {
      newsUrl,
    });
    if (data) {
      setSourceHtml(data.paragraphs);
      setTitle(data.title);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (errors.newsUrl) {
      // Fix: https://github.com/react-hook-form/react-hook-form/issues/987
      setError(errors.newsUrl && (errors.newsUrl as any).message);
    }
  }, [errors, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        disabled={isLoading}
        type="text"
        {...register("newsUrl", {
          pattern: {
            value: urlRegExPattern,
            message: "Needs to be a valid URL",
          },
        })}
        onChange={(e) => setNewsUrl(e.target.value)}
        value={newsUrl}
      />
      <button disabled={isLoading || !newsUrl?.length ? true : false}>
        Get Outline
      </button>
      {error && (
        <span className="error-message">
          <small>{error}</small>
        </span>
      )}
    </form>
  );
};
