import Modal from './Modal';
import Counter from "../inputs/Counter";
import qs from 'query-string';
import Heading from "../Heading";
import CountrySelect, {CountrySelectValue} from "../inputs/CountrySelect";
import {useCallback, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useSearchModal from "../../hooks/useSearchModal";
import Map from "../Map";

enum STEPS {
    LOCATION = 0,
    INFO = 1,
}

const SearchModal = () => {
    const navigator = useNavigate();
    const searchModal = useSearchModal();
    const loc = useLocation();

    const searchParams = new URLSearchParams(loc.search);

    const [step, setStep] = useState(STEPS.LOCATION);

    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
            if (step !== STEPS.INFO) {
                return onNext();
            }

            let currentQuery = {};

            if (searchParams) {
                currentQuery = qs.parse(searchParams.toString())
            }

            const updatedQuery: any = {
                ...currentQuery,
                locationValue: location?.value,
                guestCount,
                roomCount,
                bathroomCount
            };

            const url = qs.stringifyUrl({
                url: '/',
                query: updatedQuery,
            }, { skipNull: true });

            setStep(STEPS.LOCATION);
            searchModal.onClose();
            navigator(url);
        },
        [
            step,
            searchModal,
            location,
            navigator,
            guestCount,
            roomCount,
            onNext,
            bathroomCount,
            searchParams
        ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) =>
                    setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter
                    onChange={(value) => setGuestCount(value)}
                    value={guestCount}
                    title="Guests"
                    subtitle="How many guests are coming?"
                />
                <hr />
                <Counter
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                />
                <hr />
                <Counter
                    onChange={(value) => {
                        setBathroomCount(value)
                    }}
                    value={bathroomCount}
                    title="Bathrooms"
                    subtitle="How many bahtrooms do you need?"
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModal.onClose}
            body={bodyContent}
        />
    );
}

export default SearchModal;