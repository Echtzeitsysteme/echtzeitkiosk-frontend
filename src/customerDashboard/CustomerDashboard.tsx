import React, { CSSProperties } from 'react';
import { useMediaQuery, Theme } from '@mui/material';

import WelcomeSuperuser from './WelcomeSuperuser';
import ShoppingTable from './ShoppingTable';
import ShoppingCart from './ShoppingCart';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const CustomerDashboard = () => {
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('lg')
    );

    return (
        <div style={styles.flexColumn as CSSProperties}>
            <div style={styles.singleCol}>
                <ShoppingCart />
                {/* <Spacer /> */}
                {/* <ShoppingTable /> */}
            </div>
        </div>
    );

    // return isXSmall ? (
    //     <div>
    //         <div style={styles.flexColumn as CSSProperties}>
    //             <WelcomeSuperuser />
    //             <WelcomeSuperuser />
    //             <VerticalSpacer />
    //             <WelcomeSuperuser />
    //             <VerticalSpacer />
    //             <WelcomeSuperuser />
    //         </div>
    //     </div>
    // ) : isSmall ? (
    //     <div style={styles.flexColumn as CSSProperties}>
    //         <div style={styles.singleCol}>
    //             <WelcomeSuperuser />
    //         </div>
    //         <div style={styles.flex}>
    //             <WelcomeSuperuser />
    //             <Spacer />
    //             <WelcomeSuperuser />
    //         </div>
    //         <div style={styles.singleCol}>
    //             <WelcomeSuperuser />
    //         </div>
    //         <div style={styles.singleCol}>
    //             <WelcomeSuperuser />
    //         </div>
    //     </div>
    // ) : (
    //     <>
    //         <WelcomeSuperuser />
    //         <div style={styles.flex}>
    //             <div style={styles.leftCol}>
    //                 <div style={styles.flex}>
    //                     <WelcomeSuperuser />
    //                     <Spacer />
    //                     <WelcomeSuperuser />
    //                 </div>
    //                 <div style={styles.singleCol}>
    //                     <WelcomeSuperuser />
    //                 </div>
    //                 <div style={styles.singleCol}>
    //                     <WelcomeSuperuser />
    //                 </div>
    //             </div>
    //             <div style={styles.rightCol}>
    //                 <div style={styles.flex}>
    //                     <WelcomeSuperuser />
    //                     <Spacer />
    //                     <WelcomeSuperuser />
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
};

export default CustomerDashboard;
