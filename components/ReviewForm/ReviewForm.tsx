import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import CloseIcon from "./close.svg";
import cn from 'classnames';
import Rating from "../Rating/Rating";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "@/helpers/api";
import { KeyboardEvent, useState } from "react";

const ReviewForm = ({ isOpened, productId, className, ...props }: ReviewFormProps) => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();
  

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  const handleKeyClose = (key: KeyboardEvent) => {
    if (key.code === "Enter" || key.code === "Space") {
      setIsSuccess(false);
      setError();
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} tabIndex={isOpened ? 0 : -1}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input {...register('name', { required: { value: true, message: 'Введите имя' } })} placeholder="Имя" error={errors.name} tabIndex={isOpened ? 0 : -1} aria-invalid={errors.name ? true : false} />
        <Input {...register('title', { required: { value: true, message: 'Введите заголовок отзыва' } })} placeholder="Заголовок отзыва" error={errors.title} tabIndex={isOpened ? 0 : -1} aria-invalid={errors.title ? true : false} />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller rules={{ required: { value: true, message: 'Укажите рейтинг' } }} control={control} name='rating' render={({ field }) => (
            <Rating tabIndex={isOpened ? 0 : -1} error={errors.rating} rating={field.value} ref={field.ref} isEditable setRating={field.onChange} />
          )} />
        </div>
        <Textarea {...register('description', { required: { value: true, message: 'Введите текст отзыва' } })} className={styles.description} placeholder="Текст отзыва" error={errors.description} tabIndex={isOpened ? 0 : -1} aria-label="Текст отзыва" aria-invalid={errors.description ? true : false} />
        <div className={styles.submit}>
          <Button onClick={() => clearErrors()} tabIndex={isOpened ? 0 : -1} appearance="primary">
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={styles.success} tabIndex={0} role="alert">
        <div className={styles.successTitle}>
          Ваш отзыв отправлен
        </div>
        <div>
          Спасибо, ваш отзыв будет опубликован после проверки
        </div>
        <CloseIcon aria-label="Закрыть оповещение" tabIndex={0} onClick={() => setIsSuccess(false)} onKeyDown={handleKeyClose} className={styles.close} />
      </div>}
      {error && <div className={styles.error} role="alert">
        <div tabIndex={0} tabIndex={0} className={styles.errorTitle}>
          Произошла ошибка
        </div>
        <div>
          Что-то пошло не так, попробуйте обновить страницу
        </div>
        <button aria-label="Закрыть оповещение" tabIndex={0} onClick={() => setError()} onKeyDown={handleKeyClose}>
          <CloseIcon className={styles.close} />
        </button>
      </div>}
    </form>
   );
};

export default ReviewForm;
