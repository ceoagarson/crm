import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useContext } from 'react'
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import EmailVerifySendMailDialogForm from '../../forms/user/EmailVerifySendMailForm'


function EmailVerifySendMailDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === ChoiceActions.verify_email ? true : false}
            onClose={() => setChoice({ type: ChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Verify Your Email</DialogTitle>
            <DialogContent>
                <EmailVerifySendMailDialogForm />
            </DialogContent>
            <DialogActions>
                <Typography
                    variant="button"
                    component="p"
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                </Typography >
            </DialogActions>
        </Dialog>
    )
}

export default EmailVerifySendMailDialog