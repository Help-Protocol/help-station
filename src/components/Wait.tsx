import { FC } from "react"
import classNames from "classnames/bind"
import Card from "./Card"
import Icon from "./Icon"
import Loading from "./Loading"
import Button, { ButtonInterface, Submit } from "./Button"
import LinkButton, { LinkProps } from "./LinkButton"
import styles from "./Wait.module.scss"

const cx = classNames.bind(styles)

export enum STATUS {
  SUCCESS = "success",
  LOADING = "loading",
  FAILURE = "failure",
}

interface Props {
  status: STATUS
  link?: LinkProps
  button?: ButtonInterface
}

const Wait: FC<Props> = ({ status, link, button, children }) => {
  const title = {
    [STATUS.SUCCESS]: "Complete!",
    [STATUS.LOADING]: "Broadcasting transaction...",
    [STATUS.FAILURE]: "Failed",
  }[status]

  const iconName: IconNames | undefined = {
    [STATUS.SUCCESS]: "CheckDouble" as IconNames,
    [STATUS.LOADING]: undefined,
    [STATUS.FAILURE]: "ExclamationCircle" as IconNames,
  }[status]

  const icon = iconName ? (
    <Icon name={iconName} className={cx(status)} size={50} />
  ) : (
    <Loading size={40} />
  )

  return (
    <article>
      <Card icon={icon} title={title} lg>
        <section className={styles.contents}>
          {status === STATUS.FAILURE ? (
            <p className={styles.feedback}>{children}</p>
          ) : (
            children
          )}
        </section>
      </Card>

      {(link || button) && (
        <Submit>
          {link ? (
            <LinkButton {...link} size="lg" />
          ) : (
            <Button {...button} size="lg" />
          )}
        </Submit>
      )}
    </article>
  )
}

export default Wait
